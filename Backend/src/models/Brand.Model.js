import mongoose, {Schema} from 'mongoose'

const BrandSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  image:{
    type: String,
    required:false,
    default:""
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }
});

export default mongoose.model('Brand', BrandSchema);