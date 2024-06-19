import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="container mx-auto">
      <nav className='flex justify-between'>
        <div>AlgoArena</div>
        <div className='flex gap-5'>
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </nav>
    </div>
  )
}

