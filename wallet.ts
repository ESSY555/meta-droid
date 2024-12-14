import { LAMPORTS_PER_SOL, Connection, Keypair } from "@solana/web3.js";
import * as fs from 'fs';
import bs58 from 'bs58';

// Step 1: Connect to the Solana network
const endPoint = 'https://alpha-stylish-morning.solana-devnet.quiknode.pro/05683ef61bf3da5ea98c473ca35a4963d2e3591b'; // Set the RPC endpoint, e.g., Devnet
const solanaConnection = new Connection(endPoint, 'confirmed');

// Step 2: Generate a new Solana wallet
const keypair = Keypair.generate();
console.log(`Generated new keypair. Wallet public key:`, keypair.publicKey.toString());

const privateKey = bs58.encode(keypair.secretKey);
console.log(`wallet privatekey`, privateKey);



// Step 3: Write wallet secret key to a JSON file
const secretArray = Array.from(keypair.secretKey);
const secret = JSON.stringify(secretArray);

fs.writeFile('guideSecret.json', secret, 'utf8', (err) => {
    if (err) throw err;
    console.log('Secret key written to guideSecret.json');
});

// Step 4: Request an airdrop to the generated wallet
(async () => {

    const airdropSignature = await solanaConnection.requestAirdrop(
        keypair.publicKey,
        LAMPORTS_PER_SOL // Airdrop 1 SOL
    );

    try {
        const tsId = await airdropSignature;
        console.log(`Airdrop Transaction Id: ${tsId}`);
        console.log(`https://explorer.solana.com/tx/${tsId}?cluster=devnet`)
    }
    catch (err) {
        console.log(err);
    }
})()

