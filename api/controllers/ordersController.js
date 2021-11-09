const orderService= require('../services/orderService');
const { validationResult } = require('express-validator');
const Paginatior = require('../commons/paginator');
const messageConstants = require('../constant/messageConstants');


// Order-Details
exports.getOderDetails= (req,res)=>{
   orderService.getOderDetails().then(data=>{
    res.status(200).json({
    success: true,
    message:messageConstants.ORDERS_FOUND,
    data:data
     });
}).catch(err =>{
  res.send({
    error:{
      status: err.status ||500,
      message: err.message
    },
  })
});
};

// Get all
exports.get= (req,res)=>{
  orderService.get().then(data=>{
   res.status(200).json({
    success: true,
   message:messageConstants.ORDERS_FOUND,
   data:data
    });
}).catch(err =>{
 res.send({
   error:{
     status: err.status ||500,
     message: err.message
   },
 })
});
};

// Get All by paging
exports.getallpaging= (req,res)=>{
  const  page = parseInt(req.query.page)||1;
  const  size = parseInt(req.query.zise);
  const { limit, offset } = Paginatior.getPagination(page, size);
  const data=(limit,offset);
   orderService.getallpaging(data).then(async(data)=>{
     const response = Paginatior.getPagingData(data, page, limit);
         res.status(200).json({
          success: true,
         message:messageConstants.ORDERS_FOUND,
         data:response 
          });
    }).catch(err =>{
       res.send({
         error:{
           status: err.status ||500,
           message: err.message
         },
       })
    });
};


// GetbyID
exports.getbyID =function(req,res){
   const Id= req.params.id;
   orderService.getbyID(Id).then(result=>{
     if(result===null){
      res.status(404).json({
        message:messageConstants.ORDERS_NOT_FOUND,
        messageError: result.message,
     })
    }else{
        res.status(200).json({
          success: true,
        message:messageConstants.ORDERS_FOUND,
        order: result,
        });
      }
     }).catch(err =>{
        res.send({
          error:{
            status: err.status ||500,
            message: err.message
          },
        })
  });
};


// Create
exports.create =(req,res,next) => {
  try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const order= {
          CustomerId:req.body.CustomerId,
          EcommerceId: req.body.EcommerceId,
          StoreId:  req.body.StoreId,
          OrderDate: req.body.OrderDate ,
          Contact:req.body.Contact ,
          Phone:req.body.Phone ,
          Description:req.body.Description ,
          Address:req.body. Address,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
         orderService.create(order).then(result=>{
           res.status(200).json({
            success: true,
            message: messageConstants.ORDERS_CREATE_SUSSCESS,
            order :result
          });
       }).catch(err =>{
          res.send({
            error:{
              status: err.status ||500,
              message: err.message
            },
          })
       });
      }catch(err){
        return next(err);
      }
};

// Update
exports.update = (req, res, next) => {
  try{
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const Id= req.params.id;
      const orderUpdate= {
        CustomerId:req.body.CustomerId,
        StoreId:  req.body.StoreId,
        EcommerceId: req.body.EcommerceId,
        OrderDate: req.body.OrderDate ,
        Contact:req.body.Contact ,
        Phone:req.body.Phone ,
        Description:req.body.Description ,
        Address:req.body.Address,
        UpdatedBy: req.body.UpdatedBy,
        UpdatedDate: Date(),
        };
       orderService.update(Id,orderUpdate).then( result=>{
        if(result==1){
        res.status(200).json({
          success: true,
           message: messageConstants.ORDERS_UPDATE_SUSSCESS,
           });
        }else{
           res.status(200).json({
              message: result.message,
           })
        }
     }).catch(err =>{
        res.send({
          error:{
            status: err.status ||500,
            message: err.message
                 },
           })
     });
}catch(err) {
  return next(err)
}
};
//Soft delete
exports.delete =function(req,res,next){
  try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const Id= req.params.id;
        const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()}
    orderService.delete(Id,options).then(result=>{
    if(result==true){
          res.status(200).json({
          success: true,
          message: messageConstants.ORDERS_DELETED,
          })
    }else{
       res.status(500).json({
       message: result.message
    })
 }        
}).catch(err =>{
          res.json({
          error:{
          status: err.status ||500,
          message: err.message
        },
      })
});

}catch(err) {
  return next(err)
  }
};
// // Delete
exports.destroy =function(req,res){
  const Id =  req.params.id;
   orderService.destroy(Id).then(result =>{
    if(result==true){
      res.status(200).json({
        success: true,
        message: messageConstants.ORDERS_DELETED,
        });
    }else{
      res.status(404).json({
      message: result.message
      });
    };
 }).catch(err =>{
    res.send({
      error:{
        status: err.status ||500,
        message:err.message
      },
    })
 });
};
// Restore
exports.restore =function(req,res){
  const Id =  req.params.id;
  const options = {field: 'Deleted', Deleted: 0,UpdatedDate:Date()}
   orderService.restore(Id,options).then(result=>{
    if(result==true){
       res.status(200).json({
        success: true,
          message: messageConstants.ORDERS_RESTORE_SUSSCESS,
       })
    }else{
       res.status(500).json({
       message: result.message,
    })
  }        
}).catch(err =>{
        res.send({
        error:{
        status: err.status ||500,
        message: err.message
      },
    })
  });
};