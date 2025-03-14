import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import sinon from 'sinon'

import List from '../../src/commands/list.js'

describe('list', () => {
  let listClaudeServersStub: sinon.SinonStub
  let listContinueServersStub: sinon.SinonStub

  beforeEach(() => {
    // Create stubs for the private methods
    listClaudeServersStub = sinon.stub(List.prototype, 'listClaudeServers' as keyof typeof List.prototype)
    listContinueServersStub = sinon.stub(List.prototype, 'listContinueServers' as keyof typeof List.prototype)

    // Make both methods return false (no servers found)
    listClaudeServersStub.resolves(false)
    listContinueServersStub.resolves(false)
  })

  afterEach(() => {
    // Restore the original methods after each test
    listClaudeServersStub.restore()
    listContinueServersStub.restore()
  })

  it('runs list cmd with no servers found', async () => {
    const {stdout} = await runCommand('list')
    // When no servers are found, it should show the "No MCP servers" message
    expect(stdout).to.include('No MCP servers currently installed.')
  })

  it('runs list with client flag and no servers found', async () => {
    const {stdout} = await runCommand('list --client=claude')
    // When filtering by client and no servers found, it should show client-specific message
    expect(stdout).to.include('No MCP servers currently installed on Claude Desktop.')
  })
})
