import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('install', () => {
  it('fails when server name is not provided', async () => {
    try {
      await runCommand('install')
      expect.fail('Command should have failed without server name')
    } catch (error: any) {
      expect(error).to.exist
    }
  })

  it('fails when server does not exist', async () => {
    try {
      await runCommand('install nonexistent-server')
      expect.fail('Command should have failed with nonexistent server')
    } catch (error: any) {
      expect(error).to.exist
    }
  })
})
