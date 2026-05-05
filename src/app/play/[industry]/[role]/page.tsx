import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ industry: string; role: string }>
}

export default async function PlayScenarioPage({ params }: Props) {
  const { industry, role } = await params
  redirect(`/play/${industry}/${role}/immersive`)
}
