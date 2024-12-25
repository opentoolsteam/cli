import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('list', () => {
  it('runs list cmd', async () => {
    const {stdout} = await runCommand('list')
    expect(stdout).to.contain('hello world')
  })

  it('runs list --name oclif', async () => {
    const {stdout} = await runCommand('list --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
