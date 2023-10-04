class ChangeImgTagInExercises < ActiveRecord::Migration[7.0]
  def change
    remove_column :exercises, :img_tag, :string
    add_column :exercises, :img_tag, :string, array: true, default: [], using: "(string_to_array(img_tag, ','))"
  end
end
