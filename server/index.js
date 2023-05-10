const express = require("express");
const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "416853",
  database: "sym",
  port: "3306"
});
db.connect();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const nodemailer = require("nodemailer");
const mailSender = `1459509693@qq.com`;
const mailSmtpcode = `evqxsnsadnznfgce`;

const transport = nodemailer.createTransport({
  host: "smtp.qq.com",
  secureConnection: true,
  port: 465,
  secure: true,
  auth: {
    user: mailSender,
    pass: mailSmtpcode
  }
});
app.all("*", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/getKeyword", function(req, res, next) {
  db.query("select * from keywords", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getNewinfo", function(req, res, next) {
  db.query("select * from zxzx", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getphotos", function(req, res, next) {
  db.query("select * from index_photos", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getpets", function(req, res, next) {
  let type = req.query.type
  let api = type && type!='undefined' ? `select * from index_pets where type='${type}'` : `select * from index_pets`
  db.query(api, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getfl", function(req, res, next) {
  db.query("select * from friendlylink", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getdogs", function(req, res, next) {
  db.query("select * from dogs", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getcats", function(req, res, next) {
  db.query("select * from cats", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getactive", function(req, res, next) {
  db.query("select * from actives", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/getnotice", function(req, res, next) {
  db.query("select * from notice", function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});
app.get("/mailcode", (req, res, next) => {
  let code;
  let mail = req.query.email;
  db.query("select * from user", (err, val) => {
    let userIndex = -1;
    val.forEach((item, index) => {
      if (item.email === mail) {
        userIndex = index;
      }
    });
    if (userIndex !== -1) {
      return res.send({ status: -1, msg: "邮箱已存在" });
    } else {
      code = Math.floor(Math.random() * 900000) + 100000;
      let mailOptions = {
        from: `1459509693@qq.com`,
        to: mail,
        subject: "注册验证码",
        text: `${code}`,
        html: `<p style=""align:center;>您的验证码为</p>
          <h2 style=""align:center;>${code}</h2>`
      };
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.end(JSON.stringify(code));
  });
});
app.get("/register", (req, res, next) => {
  let sql = "select * from user";
  let isExistUser;
  db.query(sql, (err, val) => {
    isExistUser = val.every(item => {
      return item.username !== req.query.username;
    });
    if (!isExistUser) {
      res.send({ status: -1, msg: "用户名已存在" });
      return;
    } else {
      //向数据库插入数据
      let insertUserSql =
        "insert into user (username,password,email,registertime) values (?,?,?,?)";
      let insertParams = [
        req.query.username,
        req.query.password,
        req.query.email,
        req.query.registertime
      ];
      db.query(insertUserSql, insertParams, (err, result) => {
        if (err) console.log(err);
        return res.json({ status: 1, data: { name: req.query.username } });
      });
    }
  });
});
app.get("/login", (req, res, next) => {
  let reqData = req.query;
  db.query("select * from user", (err, result) => {
    if (err) console.log(err);
    let isExistUser = result.every(item => {
      return item.email !== reqData.email;
    });
    if (!isExistUser) {
      result.forEach(item => {
        if (item.email == reqData.email) {
          if (item.password == reqData.password) {
            return res.json({
              status: 1,
              msg: "登录成功",
              userInfo: {
                name: item.username,
                mail: item.email
              }
            });
          } else {
            return res.json({
              status: -1,
              msg: "密码错误"
            });
          }
        }
      });
    } else {
      return res.json({
        status: -1,
        msg: "邮箱不存在，请检查后重试！"
      });
    }
  });
});
app.get("/baomin",(req,res,next) =>{
  let insertData;
  req.on("data", chunk => {
    insertData += chunk;
  });
  req.on("end", function() {
  db.query(
    `insert into baomin_msg (title,bao_name,phone_num)  values (?,?,?)`,
    (success,result)=>{
      if (success) return res.json({ status: 1, msg: "报名成功" });
    },
    (err, result) => {
      if (err) return res.json({ status: -1, msg: "报名失败" });
      return res.json({ status: 1 });
    }
  )
} )
});
app.post("/addShowpet", (req, res, next) => {
  let insertData;
  req.on("data", chunk => {
    insertData += chunk;
  });
  req.on("end", function() {
    insertData = JSON.parse(insertData.toString().replace("undefined", ""));
    let { username, txt, img, date } = insertData;
    let have_img = false;
    if (img) {
      have_img = true;
    }
    db.query(
      `insert into show_pet (user,txt,img,date,have_img) values ("${username}","${txt}","${img}","${formatTime(
        new Date(date)
      )}","${have_img}")`,
      (err, result) => {
        if (err) return res.json({ status: -1, msg: "图片过大" });
        return res.json({ status: 1 });
      }
    );
  });
});
app.get("/getshowpetdata", (req, res, next) => {
  db.query("select * from show_pet", (err, result) => {
    if (err) console.log(err);
    return res.json({ status: 1, data: result });
  });
});

const formatTime = timeObj => {
  if (timeObj instanceof Date) {
    let y = timeObj.getFullYear();
    let m = timeObj.getMonth() + 1;
    let d = timeObj.getDate();
    let hh = timeObj
      .getHours()
      .toString()
      .padStart(2, "0");
    let mm = timeObj
      .getMinutes()
      .toString()
      .padStart(2, "0");
    let ss = timeObj
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  } else {
    return {
      msg: "参数不是日期对象"
    };
  }
};

app.get("/getAdopt", (req, res, next) => {
  db.query("select * from adopt", (err, result) => {
    if (err) throw err;
    return res.json({ status: 1, data: result });
  });
});
app.listen(3000, () => {
  console.log("running");
});
