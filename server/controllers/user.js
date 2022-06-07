
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

const ROUNDS = 3    // small number just for testing now, and when deploy it to free hosting account, may use small resources

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const isUserExist = await User.findOne({ username })
        if (isUserExist) return res.json({ msg: "Username is already taken", status: false })

        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) return res.json({ msg: "Email is already used", status: false })

        const hashedPassword = await bcrypt.hash(password, ROUNDS)
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })

        delete user.password // delete password key from user object, before return the user 
        return res.json({ status: true, user })

    } catch (error) {
        res.json({ err: error })
    }


};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const fetchedUser = await User.findOne({ username })
        if (!fetchedUser) return res.json({ msg: "Incorrect username or password", status: false })

        const isPasswordValid = await bcrypt.compare(password, fetchedUser.password)
        if (!isPasswordValid) return res.json({ msg: "Incorrect username or password", status: false })

        delete fetchedUser.password
        return res.json({ status: true, user: fetchedUser })

    } catch (error) {
        return res.json({ err: error })
    }
}