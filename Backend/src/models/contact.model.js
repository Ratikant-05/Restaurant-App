import mongoose, {Schema} from 'mongoose'

const ContactSchema = new Schema({
  username: {
    type: String, 
    require: true
  },
  email: {
    type: String,
    require: true
  },
  contact: {
    type: String,
    require:true
  },
  message: {
    type: String,
    require:true
  }
});

export default mongoose.model('Contact', ContactSchema);