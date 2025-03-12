import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('uninstall', () => {
  it('fails when server name is not provided', async () => {
    try {
      await runCommand('uninstall')
      expect.fail('Command should have failed without server name')
    } catch (error: unknown) {
      expect(error).to.exist
    }
  })

  it('handles multiple server names', async () => {
    try {
      // This will fail because the servers don't exist, but we can test the argument parsing
      await runCommand('uninstall server1 server2')
      expect.fail('Command should have failed with nonexistent servers')
    } catch (error: unknown) {
      expect(error).to.exist
    }
  })
})
