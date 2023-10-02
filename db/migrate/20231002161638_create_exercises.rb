class CreateExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :question
      t.string :answer
      t.references :sub_subject, null: false, foreign_key: true

      t.timestamps
    end
  end
end
