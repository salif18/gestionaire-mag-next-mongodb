import crypto  from 'crypto';

const generateSecretKey = () => {
    const KEY_TOKEN = crypto.randomBytes(32).toString('hex');
    console.log(KEY_TOKEN)
    return KEY_TOKEN
};
generateSecretKey();