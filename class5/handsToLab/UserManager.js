import fs from 'fs'
import crypto from 'crypto'

const path = './Usuarios.json'

export default class UserManager{
    getUsuarios = async()=>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const users = JSON.parse(data);
            return users
        }else{
            return []
        }
    }

    crearUsuario = async(usuario)=>{
        const usuarios = await this.getUsuarios()
        usuario.salt = crypto.randomBytes(128).toString('base64');
        usuario.contrasena = crypto.createHmac('sha256', usuario.salt).update(usuario.contrasena).digest('hex')
        console.log(usuario)
        usuarios.push(usuario);
        await fs.promises.writeFile(path, JSON.stringify(usuarios), null, '\t')
        return usuario
    }

    validarUsuario = async(usaername, contrasena) =>{
        const usuarios = await this.getUsuarios()
        const userIndex = usuarios.findIndex(u => u.nombreUser === usaername)
        if(userIndex ===-1){
            console.log('no existe')
            return
        }
        const usuario = usuarios[userIndex]
        const newMash = crypto.createHash('sha256', usuario.salt).update(contrasena).digest('hex')

        if(newMash === usuario.contrasena){
            console.log('logeado')
        }else{
            console.log('invalido')
        }
    }
}

const userManager = new UserManager();

const prueba = async() =>{
    let users = await userManager.getUsuarios();
    console.log(users)
    let user = {
        nombre: 'sans',
        apellido:'valdes',
        nombreUser: 'jvaldes',
        contrasena: '144'
    }
    await userManager.crearUsuario(user);
    // let crearGet = await userManager.getUsuarios();
    // console.log(crearGet);
    // await userManager.validarUsuario('jvaldes', 144)
    
}

prueba()