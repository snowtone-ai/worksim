@echo off
setlocal

echo WorkSim pm-zero v9 setup

if not exist "node_modules" (
  pnpm install
) else (
  pnpm install --frozen-lockfile
)

pnpm verify

endlocal
