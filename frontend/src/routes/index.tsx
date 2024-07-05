import { Container, Main, Section } from '@/components/craft'
import Feature from '@/components/feature'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Main>
      <Navbar />
      <Section>
        <Container>
          <Hero />
          <Feature />
        </Container>
        <Footer />
      </Section>
    </Main>
  )
}

