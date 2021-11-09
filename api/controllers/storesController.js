const storeService= require('../services/storeService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');


// Create
exports.create =async(req,res,next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const store= {
      Name:req.body.Name,
      Description:req.body.Description,
      Content:req.body.Content,
      Email:  req.body.Email,
      Phone: req.body.Phone ,
      GMap:req.body.GMap ,
      Facebook:req.body.Facebook ,
      Shopee:req.body.Shopee ,
          Youtube:req.body. Youtube,
          EcommerceId: req.body.EcommerceId,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
        }
        storeService.create(store).then(result=>{
        res.status(200).json({
        success: true,
        message: messageConstants.STORE_CREATE_SUSSCESS,
        store :result
          });
        }).catch(err =>{
                    res.send({
                    error:{
                    status: err.status ||500,
                    message: err.message
                      },
                    })
                  });
            } catch(err){
              return next(err);
        }
};
          
          
// Get All
exports.get= (req,res)=>{
   storeService.get().then(data=>{
    res.status(200).json({
      success: true,
        message:messageConstants.STORE_FOUND,
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


// Get all stores by paging
exports.getallpaging= async(req,res)=>{
  const  page = parseInt(req.query.page) || 1;
   const  size = parseInt(req.query.size);
   var condition = JSON.stringify(req.query) ||null;
   const { limit, offset } = Paginator.getPagination(page, size);
   const data= {limit,offset,condition};
  await storeService.getallpaging(data).then(data=>{
    const response = Paginator.getPagingData(data, page, limit);
   res.status(200).json({
    success: true,
       message:messageConstants.STORE_FOUND,
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
   storeService.getbyID(req.params.id).then(store=>{
    if(store===null){
        res.status(200).json({
            message:messageConstants.STORE_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.STORE_FOUND,
            store:store
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


// Get Notifications
exports.getNotifications= (req,res)=>{
  storeService.getNotifications().then(data=>{
    res.status(200).json({
      success: true,
    message:messageConstants.STORE_FOUND,
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

// Get Orders
exports.getOrders= (req,res)=>{
   storeService.getOrders().then(data=>{
    res.status(200).json({
      success: true,
    message:messageConstants.STORE_FOUND,
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

// Update
exports.update = async(req,res,next) => {
  try{
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
  const  Id =  req.params.id;
  const storeUpdate= {
    Name:req.body.Name,
    Description:req.body.Description,
    Content:req.body.Content,
    Phone: req.body.Phone ,
    GMap:req.body.GMap ,
    Facebook:req.body.Facebook ,
    Shopee:req.body.Shopee ,
    Youtube:req.body.Youtube,
    EcommerceId: req.body.EcommerceId,
    UpdatedBy:req.body.UpdatedBy,
    UpdatedDate:Date(),
    }
    storeService.update(Id,storeUpdate).then( result=>{
    if(result==1){
    res.status(200).json({
      success: true,
    message: messageConstants.STORE_UPDATE_SUSSCESS,
  });
}else{
  res.status(200).json({
      message: result.message,
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
    }catch(err) {
      return next(err)
    }
};
//Soft delete
exports.delete =async(req,res,next)=>{
  const Id =  req.params.id;
  const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()}
  storeService.delete(Id,options).then(result=>{
    if(result==true){
                        res.status(200).json({
                          success: true,
                        message: messageConstants.STORE_DELETED,
                        })
                      }else{
                        res.status(500).json({
                        message: result.message,
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
    };

 // Delete
exports.destroy =function(req,res){
  const Id= req.params.id;
   storeService.destroy(Id).then(result =>{
    if(result==true){
    res.status(200).json({
      success: true,
      result:  result,
      message: messageConstants.STORE_DELETED,
    });
}else{
      res.status(500).json({
        message: result.message,
    })
  }     
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
   storeService.restore(Id,options).then(result=>{
     if(result==true){
                     res.status(200).json({
                      success: true,
                        message: messageConstants.STORE_RESTORE_SUSSCESS,
                     })   
                  }else {
                    res.status(500).json({
                      message:result.message,
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
