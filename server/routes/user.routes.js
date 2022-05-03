const express = require('express');
const router = express();
const { protect, admin } = require('../config/authMiddleware.config');
const {
  findUsers,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  findSingleUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controllers');

//Rutas:

router.get('/users', protect, admin, findUsers); //Obtiene todos los users
router.get('/:id', protect, admin,findSingleUser); //Obtiene un unico user
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/user/profile', protect, getUserProfile); //Obtiene los datos del usuario que esta usando la pagina 
router.put('/updateProfile', protect, updateUserProfile);
router.delete('/delete/:id',protect,admin,deleteUser); //eliminar un usuario(solo para admin)
router.put('/update/:id',protect,admin,updateUser); //que el admin actualice un perfil

module.exports = router;
