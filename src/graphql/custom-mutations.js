export const updateAgentForUpdatePoints = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
      id

      dailyPoints
      weeklyPoints
      monthlyPoints
      yearPoints {
        items {
          id
          agentID
          month
          date
          createdAt
          updatedAt
        }
        nextToken
      }

      createdAt
      updatedAt
      owner
    }
  }
`;
