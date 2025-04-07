import { type Chain, type ThirdwebClient } from "thirdweb"
import { ethers5Adapter } from "thirdweb/adapters/ethers5"
import { type Account } from "thirdweb/wallets"

export async function getEthersSignerForAccount(
  client: ThirdwebClient,
  chain: Chain,
  account: Account
) {
  return ethers5Adapter.signer.toEthers({ client, chain, account })
}
