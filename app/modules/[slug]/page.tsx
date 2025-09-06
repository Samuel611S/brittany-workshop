import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { getModuleBySlug, modules, learningTracks, getNextSlug } from '@/data/modules'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'
import ModuleClient from './ModuleClient'

interface ModulePageProps {
  params: {
    slug: string
  }
}

// Server Action for marking module complete
async function markModuleComplete(moduleSlug: string) {
  'use server'
  
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')?.value
  
  if (!accessToken) {
    throw new Error('Not authenticated')
  }

  const payload = verifyToken(accessToken)
  if (!payload) {
    throw new Error('Invalid token')
  }

  // Upsert progress record
  await prisma.progress.upsert({
    where: {
      userId_moduleSlug: {
        userId: payload.userId,
        moduleSlug,
      },
    },
    update: {
      completedAt: new Date(),
    },
    create: {
      userId: payload.userId,
      moduleSlug,
    },
  })

  // Get updated progress count
  const progressCount = await prisma.progress.count({
    where: { userId: payload.userId },
  })

  return { success: true, completedCount: progressCount }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const module = getModuleBySlug(params.slug)
  
  if (!module) {
    redirect('/workshop')
  }

  const currentIndex = modules.findIndex(m => m.slug === params.slug)
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextSlug = getNextSlug(params.slug)
  
  // Find the track this module belongs to
  const track = learningTracks.find(t => t.modules.some(m => m.slug === params.slug))

  // Check if user is authenticated and get completion status
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')?.value
  let isCompleted = false
  let isAuthenticated = false

  if (accessToken) {
    const payload = verifyToken(accessToken)
    if (payload) {
      isAuthenticated = true
      const progress = await prisma.progress.findUnique({
        where: {
          userId_moduleSlug: {
            userId: payload.userId,
            moduleSlug: params.slug,
          },
        },
      })
      isCompleted = !!progress
    }
  }

  if (!isAuthenticated) {
    redirect('/workshop')
  }

  return (
    <ModuleClient
      module={module}
      track={track}
      isCompleted={isCompleted}
      nextSlug={nextSlug}
      prevModule={prevModule}
      nextModule={nextModule}
      markModuleComplete={markModuleComplete}
    />
  )
}


