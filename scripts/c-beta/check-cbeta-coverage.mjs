import { access, readFile } from 'node:fs/promises'

const catalog = JSON.parse(await readFile('scenarios/_catalog.c-alpha.json', 'utf8'))
const implemented = []
const missing = []

for (const item of catalog) {
  const path = item.scenarioPath ?? item.plannedScenarioPath
  if (!path) {
    missing.push(`${item.industrySlug}/${item.roleSlug}: scenario path missing`)
    continue
  }

  try {
    await access(path)
    const scenario = JSON.parse(await readFile(path, 'utf8'))
    const scenes = scenario.blocks?.flatMap((block) => block.scenes ?? []) ?? []
    const isReady =
      item.modes?.includes('immersive') &&
      scenario.modes?.includes('immersive') &&
      !scenario.modes?.includes('normal') &&
      scenes.length === 5 &&
      typeof scenario.roleWorkKernel === 'object' &&
      scenario.resultFeedback

    if (isReady) implemented.push(`${item.industrySlug}/${item.roleSlug}`)
    else missing.push(`${item.industrySlug}/${item.roleSlug}: needs Cβ readiness`)
  } catch {
    missing.push(`${item.industrySlug}/${item.roleSlug}: scenario file missing`)
  }
}

console.log(`Cβ coverage readiness: ${implemented.length}/${catalog.length} catalog roles ready`)
console.log(`Ready: ${implemented.join(', ') || 'none'}`)
console.log(`Not ready: ${missing.length}`)
for (const item of missing) console.log(`- ${item}`)
