import { Button } from '@/components/ui/button.tsx'
import { useMcmConfig } from '@/hooks/mcm/use-mcm-config.ts'
import { useLoadConfig } from '@/hooks/use-load-config.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'

export default function ReloadChangesButton() {
  const lastMcmConfigPath = useMcmConfig((s) => s.lastMcmConfigPath)
  const loadConfig = useLoadConfig()
  const setGroups = useSimulation((s) => s.setGroups)

  async function onClickReloadChanges() {
    if (!lastMcmConfigPath) return

    await loadConfig(lastMcmConfigPath)

    setGroups(undefined)
  }

  return (
    <Button variant="ghost" onClick={onClickReloadChanges}>
      Reload changes
    </Button>
  )
}