import * as MdIcons from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

interface RecipeFormData {
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string;
  instruction: string;
}

export const RecipeForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    imageUrl: yup.string(),
    description: yup.string().required("You must add a description"),
    ingredients: yup.string().required("You must add a list of ingredients"),
    instruction: yup.string().required("You must add at least one instruction"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: yupResolver(schema),
  });

  const recipesRef = collection(db, "recipe");

  //   const onCreateRecipe = async (data: RecipeFormData) => {
  //     await addDoc(recipesRef, {
  //       title: data.title,
  //       imageUrl: data.imageUrl,
  //       description: data.description,
  //       ingredients: data.ingredients,
  //       instruction: data.instruction,
  //       author: user?.displayName,
  //       id: user?.uid,
  //     });
  //
  //    navigate("/")
  //   };

  const onCreateRecipe = async (data: RecipeFormData) => {
    await addDoc(recipesRef, {
      ...data,
      author: user?.displayName,
      userId: user?.uid,
      createdAt: serverTimestamp(),
    });

    navigate("/");
  };

  return (
    <>
      {user ? (
        <form
          onSubmit={handleSubmit(onCreateRecipe)}
          className="flex flex-col gap-4 text-sm mt-8"
        >
          <div className="form__field grid ">
            <label htmlFor="recipeTitle" className="w-36">
              Recipe Title:
            </label>
            <div>
              <input
                {...register("title")}
                id="recipeTitle"
                className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-10 w-full"
              />
              <p className="text-red-600">{errors.title?.message}</p>
            </div>
          </div>

          <div className="form__field grid ">
            <label htmlFor="recipeImage" className="w-36">
              Recipe Image url:
            </label>
            <div>
              <input
                {...register("imageUrl")}
                id="recipeImage"
                className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-10 w-full"
              />
              <p className="text-red-600">{errors.imageUrl?.message}</p>
            </div>
          </div>

          <div className="form__field grid ">
            <label htmlFor="recipeDescription">Recipe Description: </label>
            <div>
              <textarea
                {...register("description")}
                id="recipeDescription"
                className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-28 resize-none w-full"
              ></textarea>
              <p className="text-red-600">{errors.description?.message}</p>
            </div>
          </div>

          <div className="form__field grid ">
            <label htmlFor="recipeIngredients">Recipe Ingredients: </label>
            <div>
              <textarea
                {...register("ingredients")}
                id="recipeIngredients"
                className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-28 resize-none w-full"
              ></textarea>
              <p className="text-red-600">{errors.ingredients?.message}</p>
            </div>
          </div>

          <div className="form__field grid ">
            <label htmlFor="recipeInstruction">Instruction 1: </label>
            <div>
              <textarea
                {...register("instruction")}
                id="recipeInstruction"
                className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-14 resize-none w-full"
              ></textarea>
              <p className="text-red-600">{errors.instruction?.message}</p>
            </div>
          </div>

          <button className="flex items-center gap-1">
            <MdIcons.MdAddCircle
              style={{ color: "black", width: "30px", height: "30px" }}
            />
            <span>Add Instruction</span>
          </button>
          <input
            type="submit"
            className="bg-gray-500 text-white p-2 mt-3 cursor-pointer hover:bg-black"
            value="submit"
          />
        </form>
      ) : (
        <Login warningMessage="You must login to add a recipe" />
      )}
    </>
  );
};
