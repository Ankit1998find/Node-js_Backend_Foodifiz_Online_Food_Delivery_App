const router=require('express').Router();
const{ signUp, verifyOtp,deleteUser}=require('../Controllers/userController');

router.route('/signup')
      .post(signUp);
router.route('/signup/verify')
      .post(verifyOtp);

      router.route('/deleteUser/:id')
      .delete(deleteUser);




module.exports=router;
