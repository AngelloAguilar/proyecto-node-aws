const AWS = require('aws-sdk')

const deleteTask =  async(event)=>{

    const {id} = event.pathParameters
    const dynamodb = new AWS.DynamoDB.DocumentClient();

   await dynamodb.delete({
    TableName:"TaskTable",
    Key: {id}

    }).promise();

    return {
        status:200,
        body:{
            message:"tarea eliminada"
        }

    }

};





module.exports = {
    deleteTask,
}