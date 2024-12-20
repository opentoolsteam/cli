import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('install', () => {
  it('runs install cmd', async () => {
    const {stdout} = await runCommand('install')
    expect(stdout).to.contain('hello world')
  })

  it('runs install --name oclif', async () => {
    const {stdout} = await runCommand('install --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
