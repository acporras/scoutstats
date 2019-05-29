module.exports = io => {
    let matchs = [];
    io.on('connection', function(socket){
        socket.on("initTimer", (data) => {
            let aux = false;
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    aux = true
                }
            });
            if (!aux) {
                let temp = {};
                temp.nid_partido = data;
                temp.status = 0;
                temp.centesimas = 0;
                temp.segundos = 0;
                temp.minutos = 0;
                temp.horas = 0;
                temp.control = null;
        
                temp.cronometro = () => {
                    if (temp.centesimas < 99) {
                        temp.centesimas++;
                        if (temp.centesimas < 10) { temp.centesimas = "0"+temp.centesimas }
                    }
                    if (temp.centesimas == 99) {
                        temp.centesimas = -1;
                    }
                    if (temp.centesimas == 0) {
                        temp.segundos ++;
                        if (temp.segundos < 10) { temp.segundos = "0"+temp.segundos }
                    }
                    if (temp.segundos == 59) {
                        temp.segundos = -1;
                    }
                    if ( (temp.centesimas == 0)&&(temp.segundos == 0) ) {
                        temp.minutos++;
                        if (temp.minutos < 10) { temp.minutos = "0"+temp.minutos }
                    }
                    if (temp.minutos == 59) {
                        temp.minutos = -1;
                    }
                    if ( (temp.centesimas == 0)&&(temp.segundos == 0)&&(temp.minutos == 0) ) {
                        temp.horas ++;
                        if (temp.horas < 10) { temp.horas = "0"+temp.horas }
                    }
                }
        
                temp.inicio = () => {
                    temp.control = setInterval(temp.cronometro, 10)
                }
        
                temp.parar = () => {
                    clearInterval(temp.control);
                }
        
                temp.reinicio = () => {
                    clearInterval(temp.control);
                    temp.centesimas = 0;
                    temp.segundos = 0;
                    temp.minutos = 0;
                    temp.horas = 0;
                }
                matchs.push(temp)
            }
        })
        socket.on("GetTimerMatch", (data) => {
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    console.log('Emit event IDMatch: ', data)
                    socket.emit('SetTimerMatch', {
                        centesimas: element.centesimas,
                        segundos: element.segundos,
                        minutos: element.minutos,
                        horas: element.horas,
                        status: element.status
                    })
                }
            });
        })
        socket.on("StartMatch", (data) => {
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    element.inicio()
                    element.status = 1;
                }
            });
        })
        socket.on("StopMatch", (data) => {
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    element.parar()
                    element.status = 2;
                }
            });
        })
        socket.on("ResetMatch", (data) => {
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    element.reinicio()
                    element.status = 0;
                }
            });
        })
        socket.on("FinishMatch", (data) => {
            matchs.forEach(element => {
                if (element.nid_partido == data) {
                    element.parar()
                    element.status = 3;
                }
            });
        })
    });
}