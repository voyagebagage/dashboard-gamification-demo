export const getDailyReports = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      dailyReports {
        items {
          id
          campaignID
          date
          createdAt
          dailyTarget
          dailyPoints
          weeklyTarget
          updatedAt
          agentDailyReportsId
          weeklyReportDailyReportsId
          kpis {
            items {
              id
              agentID
              name
              result
              target
              coeff
              nextWeekTarget
              createdAt
              updatedAt
              campaignKpisId
              dailyReportKpisId
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;

export const agentByMonthlyPointsCustom = /* GraphQL */ `
  query AgentByMonthlyPoints(
    $category: String!
    $monthlyPoints: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    agentByMonthlyPoints(
      category: $category
      monthlyPoints: $monthlyPoints
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        campaigns {
          items {
            id
            name
          }
          nextToken
        }
        monthlyPoints
      }
      nextToken
    }
    # monthlyPoints
    # yearPoints {
    #   nextToken
    # }
  }
`;
