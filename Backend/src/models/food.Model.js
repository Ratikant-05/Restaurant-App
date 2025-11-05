import mongoose, {Schema} from 'mongoose'

const foodItemSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  image:{
    type: String,
    required:false,
    default:""
  },
  cusineCategory:{
    type:String,
    required:true
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

export default mongoose.model('FoodItem', foodItemSchema);