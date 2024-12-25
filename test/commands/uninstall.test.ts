import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('uninstall', () => {
  it('runs uninstall cmd', async () => {
    const {stdout} = await runCommand('uninstall')
    expect(stdout).to.contain('hello world')
  })

  it('runs uninstall --name oclif', async () => {
    const {stdout} = await runCommand('uninstall --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
