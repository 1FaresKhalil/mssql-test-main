const { application } = require('express');
const express = require('express');
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

router.delete('/customer/:customer_id', async (req, res) => {
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


router.post('employee', async (req, res) => {
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
  }


})

router.delete('/employee/:username', async (req, res) => {
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

router.post('/accounts', async (req, res) => {
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
  }
}).get('/accounts', (req, res, next) => {
  console.log("get all accounts");
  ACCOUNTS.findAll().then((accounts) => {
    res.send(accounts);
  });
});

router.delete('/accounts/:account_id', async (req, res) => {
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

router.get('/accounts/:customer_id', async (req, res) => {
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

router.post('/branch', async (req, res) => {
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
  }
});

router.delete('/branch/:branch_id', async (req, res) => {
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

router.post('/transaction', async (req, res) => {
  try {
    const { account_id, branch_id, amount, action } = req.body;
    TRANSACTION_BANK.create({
      account_id: account_id,
      branch_id: branch_id,
      amount: amount,
      action: action
    }).then((transaction) => {
      res.send(transaction);
    }
    );
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/transaction/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const query = await TRANSACTION_BANK.findAll({
      where: {
        customer_id: customer_id
      },
      include: [{
        model: ACCOUNTS,
        attributes: ['account_id', 'current_balance', 'customer_id'],
      }]
    });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});


router.get('/customer', async (req, res) => {
  try {

    const query = await customer.findAll({
      attributes: ['customer_id', 'name', 'phone', 'email', 'house_no', 'city', 'zipcode', 'username']
    });
    res.json(query);

  } catch (err) {
    console.error(err.message);
  }
});
router.get('/employee', async (req, res) => {
  try {
    const query = await EMP_LOGIN.findAll({
      attributes: ['username', 'user_password']
    });
    res.json(query);

  } catch (err) {
    console.error(err.message);
  }
});
router.get('/branch', async (req, res) => {
  try {

    const query = await BRANCH.findAll({
      attributes: ['branch_id', 'name', 'house_no', 'city', 'zip_code']
    });
    res.json(query);
  } catch (err) {
    console.error(err.message);
  }
});


router.put('/customer/:username', async (req, res) => {
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
  }
});
router.get('/customer/:username', async (req, res) => {
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