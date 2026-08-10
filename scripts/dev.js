const { spawn } = require('node:child_process')

const isWindows = process.platform === 'win32'
const npm = isWindows ? 'npm.cmd' : 'npm'

const processes = [
  { name: 'backend', args: ['run', 'dev', '--prefix', 'backend'] },
  { name: 'frontend', args: ['run', 'dev', '--prefix', 'frontend'] },
]

const children = processes.map(({ name, args }) => {
  const child = isWindows
    ? spawn(`${npm} ${args.join(' ')}`, { stdio: 'inherit', shell: true })
    : spawn(npm, args, { stdio: 'inherit', shell: false })

  child.on('exit', (code, signal) => {
    if (signal) return
    if (code && code !== 0) {
      console.error(`${name} exited with code ${code}`)
      shutdown(code)
    }
  })

  return child
})

let stopping = false

function shutdown(code = 0) {
  if (stopping) return
  stopping = true

  for (const child of children) {
    if (!child.killed) child.kill()
  }

  process.exit(code)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
