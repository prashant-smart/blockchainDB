let hash=require('object-hash');

let validProof=(proof,PROOF)=>{
    let guessHash=hash(proof);
    // console.log(guessHash);
    return guessHash==hash(PROOF);
}

module.exports.proofOfWork=(PROOF)=>{
    let proof=0;
    while(true){
        if(!validProof(proof,PROOF)){
            proof++;
        }else break;
    }
    return hash(proof);
}