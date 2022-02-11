// export const getDailyReports = /* GraphQL */ `
//   query GetCampaign($id: ID!) {
//     getCampaign(id: $id) {
//       id
//       dailyReports {
//         items {
//           id
//           createdAt
//           dailyTarget
//           dailyPoints
//           weeklyTarget
//           updatedAt
//           date
//           kpis {
//             items {
//               id
//               name
//               result
//               target
//               nextWeekTarget
//               coeff
//               createdAt
//               updatedAt
//             }
//             nextToken
//           }
//         }
//         nextToken
//       }
//     }
//   }
// `;
// export const agentByMonthlyPointsCustom = /* GraphQL */ `
//   query AgentByMonthlyPoints(
//     $category: String
//     $monthlyPoints: ModelIntKeyConditionInput
//     $sortDirection: ModelSortDirection
//     $filter: ModelAgentFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     agentByMonthlyPoints(
//       category: $category
//       monthlyPoints: $monthlyPoints
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         name
//         campaigns {
//           items {
//             id
//             name
//           }
//           nextToken
//         }
//         monthlyPoints
//       }
//       nextToken
//     }
//     # monthlyPoints
//     # yearPoints {
//     #   nextToken
//     # }
//   }
// `;
