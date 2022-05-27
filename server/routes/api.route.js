const { application } = require('express');
const express = require('express');
const { sequelize } = require('../db');
var {
  ACCOUNTS,
  BRANCH,
  EMP_LOGIN,
  TRANSACTION_BANK,
  customer,
} = require("../models");



const router = express.Router();

router.param("customer_id", async (req, res, next, account_id) => {
  /// customer get by id
  try {
    customer.findByPk(account_id).then((customer) => {
      if (customer) {
        req.customer = customer;
        next();
      } else {
        res.status(404).send("customer not found");
      }
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});

router
  .route('/customer')
  .post((req, res, next) => {

    customer.create(req.body).then((customer) => {
      res.send(customer);
    });
  }).get(
    (req, res, next) => {
      console.log("get all customers");
      customer.findAll().then((customer) => {
        res.send(customer);
      });
    }
  );

router.delete('/customer/:customer_id', async (req, res, next) => {
  try {
    const { customer_id } = req.params;
    const query = await customer.destroy({
      where: {
        customer_id: customer_id
      }
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});


router.post('employee', async (req, res, next) => {
  try {
    const { username, user_password } = req.body;
    EMP_LOGIN.create({
      username: username,
      user_password: user_password
    }).then((emp_login) => {
      res.send(emp_login);
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }


})

router.delete('/employee/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const query = await EMP_LOGIN.destroy({
      where: {
        username: username
      }
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

router.post('/accounts', async (req, res, next) => {
  try {
    const { customer_id, current_balance } = req.body;
    ACCOUNTS.create({
      customer_id: customer_id,
      current_balance: current_balance,
      date_opened: new Date()
    }).then((accounts) => {
      res.send(accounts);
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
}).get('/accounts', (req, res, next) => {
  console.log("get all accounts");
  ACCOUNTS.findAll().then((accounts) => {
    res.send(accounts);
  });
});

router.delete('/accounts/:account_id', async (req, res, next) => {
  try {
    const { account_id } = req.params;
    const query = await ACCOUNTS.destroy({
      where: {
        account_id: account_id
      }
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

router.get('/accounts/:customer_id', async (req, res, next) => {
  try {
    const { customer_id } = req.params;
    const query = await ACCOUNTS.findAll({
      where: {
        customer_id: customer_id
      }
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

router.post('/branch', async (req, res, next) => {
  try {
    const { name, house_no, city, zip_code } = req.body;
    BRANCH.create({
      name: name,
      house_no: house_no,
      city: city,
      zip_code: zip_code
    }).then((branch) => {
      res.send(branch);
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});

router.delete('/branch/:branch_id', async (req, res, next) => {
  try {
    const { branch_id } = req.params;
    const query = await BRANCH.destroy({
      where: {
        branch_id: branch_id
      }
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

router.post('/transaction', async (req, res, next) => {
  try {
    const { account_id, amount, transaction_type, branch_id } = req.body;
    console.log("🚀 ~ file: api.route.js ~ line 182 ~ router.post ~ req.body", req.body)
    TRANSACTION_BANK.create({
      account_id: account_id,
      amount: amount,
      transaction_type: transaction_type,
      branch_id: branch_id,
      date_of_transaction: new Date()
    }).then((transaction) => {
      res.send(transaction);
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});

router.get('/transaction/:customer_id', async (req, res, next) => {
  try {
    const { customer_id } = req.params;
    console.log("🚀 ~ file: api.route.js ~ line 202 ~ router.get ~ customer_id", customer_id)
    TRANSACTION_BANK.findAll({
    where: {
      account_id: customer_id
    },
      include: [{
        model: ACCOUNTS,
        attributes: ['account_id', 'current_balance', 'customer_id'],
        
      }]
    }).then((transaction) => {
      res.send(transaction);
    }
    );
    
  } catch (error) {
    console.log(error);
  }
});


router.get('/customer', async (req, res, next) => {
  try {

    const query = await customer.findAll({
      attributes: ['customer_id', 'name', 'phone', 'email', 'house_no', 'city', 'zipcode', 'username']
    });
    res.json(query);

  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});
router.post('/employee', async (req, res, next) => {
  try {
    const { username, user_password } = req.body;
    EMP_LOGIN.create({
      username: username,
      user_password: user_password
    }).then((emp_login) => {
      res.send(emp_login);
    }
    );
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});

router.get('/employee', async (req, res, next) => {
  try {
    console.log("🚀 ~ file: api.route.js ~ line 242 ~ router.get ~ employee",)
    const query = await EMP_LOGIN.findAll({
      attributes: ['username', 'user_password']
    });
    res.json(query);

  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});
router.get('/branch', async (req, res, next) => {
  try {

    BRANCH.findAll({}).then((branch) => {
      res.json(branch);
    });
    
    
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


router.put('/customer/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { name, phone, email, house_no, city, zipcode } = req.body;
    const query = await customer.update({
      name: name,
      phone: phone,
      email: email,
      house_no: house_no,
      city: city,
      zipcode: zipcode
    }, {
      where: {
        username: username
      }
    });
    res.json(query);
  } catch (err) {
    console.error(err.message);
    next(err);;
  }
});
router.get('/customer/:username', async (req, res, next) => {
  try {

    const { username } = req.params;
    const query = await customer.findOne(
      {
        where: {
          username: username
        }
      }
    )
    res.json(query);

  } catch (error) {
    console.log(error);
  }
});







module.exports = router;