import mongoose, {Schema} from 'mongoose'

const BrandSchema = new Schema({
  name: {
    type: String, 
    require: true
  },
  image:{
    type: String,
    require:false,
    default:""
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    require: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require:true
  }
});

export default mongoose.model('Brand', BrandSchema);