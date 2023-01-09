
- npm run deploy

--> near call dev-1673015912398-25693765560851 init '{"owner_id": "binhle", "prefix": "duc"}' --accountId dev-1673015912398-25693765560851

--> near call dev-1673015912398-25693765560851 mint_nft '{"token_owner_id": "binh1", "metadata": {"title" : "binh-title", "description": "nft nice", "media":"url-binh", "media_hash": "0x123", "copies": 2, "issued_at":3, "expires_at": 4, "starts_at": 5, "updated_at": 6, "extra": "binh extra", "reference": "binh json", "reference_hash": "0xreferen"}}' --accountId dev-1673015912398-25693765560851

--> Vì type TokenMetadata có những property có thể null nên tôi có thể bỏ đi các thuộc tính đó:
near call dev-1673015912398-25693765560851 mint_nft '{"token_owner_id": "binh1", "metadata": {"title" : "binh-title", "description": "nft nice", "media":"url-binh", "media_hash": "0x123", "copies": 2}}' --accountId dev-1673015912398-25693765560851

-->  near view dev-1673015912398-25693765560851 get_token_by_id '{"token_id": 2}'

--> near view dev-1673015912398-25693765560851 get_all_tokens




*** Công thức:
near call <contractName> <methodName> [args]




1. Tôi học thêm cách viết các parameters

// Cách 1:

 @call({}) 
 nft_transfer(
   receiver_id: string,
   token_id: number,
   approval_id: number|null,
   memo: string|null,
 ) {}



// Cách 2:

 @call({})
 nft_transfer({
   receiver_id,
   token_id,
   approval_id,
   memo,
 }: {
   receiver_id: string;
   token_id: number;
   approval_id?: number;
   memo?: string;
 }) {}