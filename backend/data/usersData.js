import bcrypt from 'bcryptjs';

const usersData = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Dennis Cox',
        email: 'dennis.cox@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Arlene Chambers',
        email: 'arlene.chambers@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default usersData;