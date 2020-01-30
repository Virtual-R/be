exports.seed = async (knex) => {
  await knex('projects').insert([
    {
      project_id: 1,
      user_id: 1,
      title: "Aenigma",
      description: "Aenigma is a project which seeks to put the user in the shoes of the urban homeless population to encourage empathy.",
      goal_amount: 10000,
      amount_received: 2502,
    }, 
    {
      project_id: 2,
      user_id: 2,
      title: "Balthazar",
      description: "Balthazar is about a young city child's imaginary friend.",
      goal_amount: 5000,
      amount_received: 2006,
    }, 
  ])
}