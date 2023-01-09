import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  LookupMap,
  UnorderedMap,
} from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";


type TokenMetadata = {
  title: string|null, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string|null, // free-form description
  media: string|null, // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string|null, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: number|null, // number of copies of this set of metadata in existence when token was minted.
  issued_at: number|null, // When token was issued or minted, Unix epoch in milliseconds
  expires_at: number|null, // When token expires, Unix epoch in milliseconds
  starts_at: number|null, // When token starts being valid, Unix epoch in milliseconds
  updated_at: number|null, // When token was last updated, Unix epoch in milliseconds
  extra: string|null, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference: string|null, // URL to an off-chain JSON file with more info.
  reference_hash: string|null // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

class Token {
  token_id: number;
  owner_id: AccountId;
  metadata: TokenMetadata;

  constructor(
    token_id: number,
    owner_id: AccountId,
    metadata: TokenMetadata,
  ) {
      (this.token_id = token_id),
      (this.owner_id = owner_id),
      (this.metadata = metadata)
  }
}

@NearBindgen({})
class Contract {
  owner_id: AccountId;
  token_id: number;
  owner_by_id: LookupMap;
  token_by_id: LookupMap;
  constructor() {
    this.token_id = 0;
    this.owner_id = "";
    this.owner_by_id = new LookupMap("o");
    this.token_by_id = new LookupMap("t");
  }

  @initialize({})
  init({ owner_id, prefix }: { owner_id: AccountId; prefix: string }) {
    this.token_id = 0;
    this.owner_id = owner_id;
    this.owner_by_id = new LookupMap(prefix);
    this.token_by_id = new LookupMap("t");
  }

  @call({}) 
  mint_nft({ token_owner_id, metadata } : {token_owner_id: string, metadata: TokenMetadata}) {
    this.owner_by_id.set(this.token_id.toString(), token_owner_id); 

    let token = new Token(
      this.token_id,
      token_owner_id,
      metadata,
    );

    this.token_by_id.set(this.token_id.toString(), token);

    this.token_id++;

    return token;
  }

  @view({})
  get_token_by_id({ token_id }: { token_id: number }) {
    let token = this.token_by_id.get(token_id.toString());

    if (token === null) {
      return null;
    }

    return token;
  }

  @view({})
  get_supply_tokens() {
    return this.token_id;
  }

  @view({})
  get_all_tokens({ start, max }: { start?: number; max?: number }) {
    var all_tokens = [];

    for (var i = 0; i < this.token_id; i++) {
      all_tokens.push(this.token_by_id.get(i.toString()));
    }

    return all_tokens;
  }


// Bài tập về nhà

  @view({}) 
  nft_total_supply(): number {
    return this.token_id;
  }

  @view({})
  nft_tokens(
   from_index: number|null, // default: "0"
   limit: number|null, // default: unlimited (could fail due to gas limit)
 ) {
   var all_tokens = [];

   for (var i = 0; i < this.token_id; i++) {
     all_tokens.push(this.token_by_id.get(i.toString()));
   }

   return all_tokens;
 }

 @view({})
 nft_token({ token_id }: { token_id: number }) {
  let token = this.token_by_id.get(token_id.toString());

  if (token === null) {
    return null;
  }

  return token;
 }
 
 @call({}) 
 nft_supply_for_owner(
   account_id: string,
 ): number {
  return this.token_id;
 }


//  Github - near-sdk-js

@view({})
nft_tokens_for_owner({
  account_id,
  from_index,
  limit,
}: {
  account_id: string;
  from_index?: number;
  limit?: number;
}) {
  
}

@call({ payableFunction: true })
nft_approve({
  token_id,
  account_id,
  msg,
}: {
  token_id: string;
  account_id: string;
  msg?: string;
}) {
  
}

@call({ payableFunction: true })
nft_revoke({
  token_id,
  account_id,
}: {
  token_id: string;
  account_id: string;
}) {

}

@call({ payableFunction: true })
nft_revoke_all({ token_id }: { token_id: string }) {
  
}

@view({})
nft_is_approved({
  token_id,
  approved_account_id,
  approval_id,
}: {
  token_id: string;
  approved_account_id: string;
  approval_id?: bigint;
}): boolean {
  return true;
}

@call({})
nft_resolve_transfer({
  previous_owner_id,
  receiver_id,
  token_id,
  approved_account_ids,
}: {
  previous_owner_id: string;
  receiver_id: string;
  token_id: string;
  approved_account_ids?: { [approval: string]: bigint };
}): boolean {
  return true;
}

// @view({})
// nft_metadata(): NFTContractMetadata {
//   assert(this.metadata !== null, "Metadata not initialized");
//   return this.metadata;
// }

@call({ payableFunction: true })
nft_transfer({
  receiver_id,
  token_id,
  approval_id,
  memo,
}: {
  receiver_id: string;
  token_id: string;
  approval_id?: bigint;
  memo?: string;
}) {
  
}

@call({ payableFunction: true })
nft_transfer_call({
  receiver_id,
  token_id,
  approval_id,
  memo,
  msg,
}: {
  receiver_id: string;
  token_id: string;
  approval_id?: bigint;
  memo?: string;
  msg: string;
}) {

}


}


// Tôi học thêm cách viết các parameters

// Cách 1:

// @call({}) 
// nft_transfer(
//   receiver_id: string,
//   token_id: number,
//   approval_id: number|null,
//   memo: string|null,
// ) {}


// Cách 2:

// @call({})
// nft_transfer({
//   receiver_id,
//   token_id,
//   approval_id,
//   memo,
// }: {
//   receiver_id: string;
//   token_id: number;
//   approval_id?: number;
//   memo?: string;
// }) {}