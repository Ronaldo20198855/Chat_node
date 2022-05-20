

module.exports = function (io) {
    
    let usersNames = [''];


    io.on('connection', (Socket)=>{
        Socket.on('validate-user', (data,callback)=>{
            if (usersNames.indexOf(data) != -1){
                callback(false)
            }else{
                callback(true)
                Socket.usersNames = data;
                usersNames.push(Socket.usersNames);
                uptadeNames();
            }
        });
        Socket.on('send-message', data=>{
            io.emit('req-messege',{
                msg:data,
                nick: Socket.usersNames
            });
        })
 
        Socket.on('disconnect', () => {
            if(!Socket.usersNames)return;
            usersNames.splice(usersNames.indexOf(Socket.usersNames),1)
            uptadeNames();
        });    

        function uptadeNames() {
            io.emit('new-user', usersNames);
        }
        
        
    });
    }