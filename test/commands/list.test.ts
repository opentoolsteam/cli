import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('list', () => {
  it('runs list cmd', async () => {
    const {stdout} = await runCommand('list')
    // The list command should output client names
    expect(stdout).to.include('Claude Desktop')
    // We don't check for specific servers as they may vary
  })

  it('runs list with client flag', async () => {
    const {stdout} = await runCommand('list --client=claude')
    // When filtering by client, the output should include the client name
    expect(stdout).to.include('Claude Desktop')
  })
})
