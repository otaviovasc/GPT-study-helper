class Exercise < ApplicationRecord
  belongs_to :sub_subject

  def self.random_exercises(sub_subject_id, limit = 5)
    where(sub_subject_id: sub_subject_id).order("RANDOM()").limit(limit)
  end
end
