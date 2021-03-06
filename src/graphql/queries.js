/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      category
      firstName
      lastName
      email
      phone
      companyName
      website
      country
      campaigns {
        items {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        nextToken
      }
      notes
      createdAt
      updatedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        firstName
        lastName
        email
        phone
        companyName
        website
        country
        campaigns {
          nextToken
        }
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const clientByfirstName = /* GraphQL */ `
  query ClientByfirstName(
    $category: String!
    $firstName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByfirstName(
      category: $category
      firstName: $firstName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        firstName
        lastName
        email
        phone
        companyName
        website
        country
        campaigns {
          nextToken
        }
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const clientBylastName = /* GraphQL */ `
  query ClientBylastName(
    $category: String!
    $lastName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientBylastName(
      category: $category
      lastName: $lastName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        firstName
        lastName
        email
        phone
        companyName
        website
        country
        campaigns {
          nextToken
        }
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchClients = /* GraphQL */ `
  query SearchClients(
    $filter: SearchableClientFilterInput
    $sort: [SearchableClientSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableClientAggregationInput]
  ) {
    searchClients(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        category
        firstName
        lastName
        email
        phone
        companyName
        website
        country
        campaigns {
          nextToken
        }
        notes
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
      id
      category
      name
      email
      teamID
      campaigns {
        items {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        nextToken
      }
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
        }
        nextToken
      }
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
      totalPoints
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const agentByDailyPoints = /* GraphQL */ `
  query AgentByDailyPoints(
    $category: String!
    $dailyPoints: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    agentByDailyPoints(
      category: $category
      dailyPoints: $dailyPoints
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const agentByWeeklyPoints = /* GraphQL */ `
  query AgentByWeeklyPoints(
    $category: String!
    $weeklyPoints: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    agentByWeeklyPoints(
      category: $category
      weeklyPoints: $weeklyPoints
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const agentByMonthlyPoints = /* GraphQL */ `
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
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const agentByTotalPoints = /* GraphQL */ `
  query AgentByTotalPoints(
    $category: String!
    $totalPoints: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    agentByTotalPoints(
      category: $category
      totalPoints: $totalPoints
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const agentByName = /* GraphQL */ `
  query AgentByName(
    $category: String!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    agentByName(
      category: $category
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      name
      category
      type
      client {
        id
        category
        firstName
        lastName
        email
        phone
        companyName
        website
        country
        campaigns {
          nextToken
        }
        notes
        createdAt
        updatedAt
      }
      agent {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      startDate
      endDate
      createdAt
      status
      length
      notes
      dailyReports {
        items {
          id
          date
          createdAt
          dailyTarget
          dailyPoints
          weeklyTarget
          updatedAt
          kpis {
            items {
              id
              name
              result
              target
              nextWeekTarget
              coeff
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
      weeklyReports {
        items {
          id
          campaignID
          createdAt
          weeklyTarget
          weeklyPoints
          willBeActiveOn
          updatedAt
          campaignWeeklyReportsId
          monthlyReportWeeklyReportsId
        }
        nextToken
      }
      monthlyReports {
        items {
          id
          campaignID
          createdAt
          monthlyTarget
          monthlyPoints
          updatedAt
          campaignMonthlyReportsId
        }
        nextToken
      }
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
      updatedAt
      clientCampaignsId
      agentCampaignsId
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
    }
  }
`;
export const campaignById = /* GraphQL */ `
  query CampaignById(
    $category: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignById(
      category: $category
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
    }
  }
`;
export const campaignByCreatedAt = /* GraphQL */ `
  query CampaignByCreatedAt(
    $category: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignByCreatedAt(
      category: $category
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
    }
  }
`;
export const campaignTypeByLength = /* GraphQL */ `
  query CampaignTypeByLength(
    $type: String!
    $length: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignTypeByLength(
      type: $type
      length: $length
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
    }
  }
`;
export const campaignByEndDate = /* GraphQL */ `
  query CampaignByEndDate(
    $type: String!
    $endDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignByEndDate(
      type: $type
      endDate: $endDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
    }
  }
`;
export const searchCampaigns = /* GraphQL */ `
  query SearchCampaigns(
    $filter: SearchableCampaignFilterInput
    $sort: [SearchableCampaignSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCampaignAggregationInput]
  ) {
    searchCampaigns(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      agents {
        items {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      dailyPoints
      weeklyPoints
      monthlyPoint
      totalPoints
      createdAt
      updatedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        agents {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoint
        totalPoints
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getYearPoints = /* GraphQL */ `
  query GetYearPoints($id: ID!) {
    getYearPoints(id: $id) {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const listYearPoints = /* GraphQL */ `
  query ListYearPoints(
    $filter: ModelYearPointsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYearPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getWeeklyReport = /* GraphQL */ `
  query GetWeeklyReport($id: ID!) {
    getWeeklyReport(id: $id) {
      id
      campaignID
      campaign {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
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
        }
        nextToken
      }
      createdAt
      weeklyTarget
      weeklyPoints
      willBeActiveOn
      updatedAt
      campaignWeeklyReportsId
      monthlyReportWeeklyReportsId
    }
  }
`;
export const listWeeklyReports = /* GraphQL */ `
  query ListWeeklyReports(
    $filter: ModelWeeklyReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeeklyReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        dailyReports {
          nextToken
        }
        createdAt
        weeklyTarget
        weeklyPoints
        willBeActiveOn
        updatedAt
        campaignWeeklyReportsId
        monthlyReportWeeklyReportsId
      }
      nextToken
    }
  }
`;
export const weeklyReportByCampaign = /* GraphQL */ `
  query WeeklyReportByCampaign(
    $campaignID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWeeklyReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    weeklyReportByCampaign(
      campaignID: $campaignID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        dailyReports {
          nextToken
        }
        createdAt
        weeklyTarget
        weeklyPoints
        willBeActiveOn
        updatedAt
        campaignWeeklyReportsId
        monthlyReportWeeklyReportsId
      }
      nextToken
    }
  }
`;
export const searchWeeklyReports = /* GraphQL */ `
  query SearchWeeklyReports(
    $filter: SearchableWeeklyReportFilterInput
    $sort: [SearchableWeeklyReportSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableWeeklyReportAggregationInput]
  ) {
    searchWeeklyReports(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        dailyReports {
          nextToken
        }
        createdAt
        weeklyTarget
        weeklyPoints
        willBeActiveOn
        updatedAt
        campaignWeeklyReportsId
        monthlyReportWeeklyReportsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getMonthlyReport = /* GraphQL */ `
  query GetMonthlyReport($id: ID!) {
    getMonthlyReport(id: $id) {
      id
      campaignID
      campaign {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      createdAt
      monthlyTarget
      weeklyReports {
        items {
          id
          campaignID
          createdAt
          weeklyTarget
          weeklyPoints
          willBeActiveOn
          updatedAt
          campaignWeeklyReportsId
          monthlyReportWeeklyReportsId
        }
        nextToken
      }
      monthlyPoints
      updatedAt
      campaignMonthlyReportsId
    }
  }
`;
export const listMonthlyReports = /* GraphQL */ `
  query ListMonthlyReports(
    $filter: ModelMonthlyReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMonthlyReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        createdAt
        monthlyTarget
        weeklyReports {
          nextToken
        }
        monthlyPoints
        updatedAt
        campaignMonthlyReportsId
      }
      nextToken
    }
  }
`;
export const monthlyReportByCampaign = /* GraphQL */ `
  query MonthlyReportByCampaign(
    $campaignID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMonthlyReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    monthlyReportByCampaign(
      campaignID: $campaignID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        createdAt
        monthlyTarget
        weeklyReports {
          nextToken
        }
        monthlyPoints
        updatedAt
        campaignMonthlyReportsId
      }
      nextToken
    }
  }
`;
export const searchMonthlyReports = /* GraphQL */ `
  query SearchMonthlyReports(
    $filter: SearchableMonthlyReportFilterInput
    $sort: [SearchableMonthlyReportSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMonthlyReportAggregationInput]
  ) {
    searchMonthlyReports(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        createdAt
        monthlyTarget
        weeklyReports {
          nextToken
        }
        monthlyPoints
        updatedAt
        campaignMonthlyReportsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getDailyReport = /* GraphQL */ `
  query GetDailyReport($id: ID!) {
    getDailyReport(id: $id) {
      id
      campaignID
      campaign {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      agent {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
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
      date
      createdAt
      dailyTarget
      dailyPoints
      weeklyTarget
      updatedAt
      agentDailyReportsId
      weeklyReportDailyReportsId
    }
  }
`;
export const listDailyReports = /* GraphQL */ `
  query ListDailyReports(
    $filter: ModelDailyReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDailyReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
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
        date
        createdAt
        dailyTarget
        dailyPoints
        weeklyTarget
        updatedAt
        agentDailyReportsId
        weeklyReportDailyReportsId
      }
      nextToken
    }
  }
`;
export const searchDailyReports = /* GraphQL */ `
  query SearchDailyReports(
    $filter: SearchableDailyReportFilterInput
    $sort: [SearchableDailyReportSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableDailyReportAggregationInput]
  ) {
    searchDailyReports(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        kpis {
          nextToken
        }
        date
        createdAt
        dailyTarget
        dailyPoints
        weeklyTarget
        updatedAt
        agentDailyReportsId
        weeklyReportDailyReportsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getKpi = /* GraphQL */ `
  query GetKpi($id: ID!) {
    getKpi(id: $id) {
      id
      agentID
      name
      campaign {
        id
        name
        category
        type
        client {
          id
          category
          firstName
          lastName
          email
          phone
          companyName
          website
          country
          notes
          createdAt
          updatedAt
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        startDate
        endDate
        createdAt
        status
        length
        notes
        dailyReports {
          nextToken
        }
        weeklyReports {
          nextToken
        }
        monthlyReports {
          nextToken
        }
        kpis {
          nextToken
        }
        updatedAt
        clientCampaignsId
        agentCampaignsId
      }
      result
      target
      coeff
      nextWeekTarget
      dailyReport {
        id
        campaignID
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        kpis {
          nextToken
        }
        date
        createdAt
        dailyTarget
        dailyPoints
        weeklyTarget
        updatedAt
        agentDailyReportsId
        weeklyReportDailyReportsId
      }
      agent {
        id
        category
        name
        email
        teamID
        campaigns {
          nextToken
        }
        kpis {
          nextToken
        }
        dailyReports {
          nextToken
        }
        dailyPoints
        weeklyPoints
        monthlyPoints
        yearPoints {
          nextToken
        }
        totalPoints
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      campaignKpisId
      dailyReportKpisId
    }
  }
`;
export const listKpis = /* GraphQL */ `
  query ListKpis(
    $filter: ModelKpiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKpis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        agentID
        name
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        result
        target
        coeff
        nextWeekTarget
        dailyReport {
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
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        campaignKpisId
        dailyReportKpisId
      }
      nextToken
    }
  }
`;
export const kpiByResult = /* GraphQL */ `
  query KpiByResult(
    $name: String!
    $result: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelKpiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    kpiByResult(
      name: $name
      result: $result
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        agentID
        name
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        result
        target
        coeff
        nextWeekTarget
        dailyReport {
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
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        campaignKpisId
        dailyReportKpisId
      }
      nextToken
    }
  }
`;
export const kpiByTarget = /* GraphQL */ `
  query KpiByTarget(
    $name: String!
    $target: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelKpiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    kpiByTarget(
      name: $name
      target: $target
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        agentID
        name
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        result
        target
        coeff
        nextWeekTarget
        dailyReport {
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
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        campaignKpisId
        dailyReportKpisId
      }
      nextToken
    }
  }
`;
export const searchKpis = /* GraphQL */ `
  query SearchKpis(
    $filter: SearchableKpiFilterInput
    $sort: [SearchableKpiSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableKpiAggregationInput]
  ) {
    searchKpis(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        agentID
        name
        campaign {
          id
          name
          category
          type
          startDate
          endDate
          createdAt
          status
          length
          notes
          updatedAt
          clientCampaignsId
          agentCampaignsId
        }
        result
        target
        coeff
        nextWeekTarget
        dailyReport {
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
        }
        agent {
          id
          category
          name
          email
          teamID
          dailyPoints
          weeklyPoints
          monthlyPoints
          totalPoints
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        campaignKpisId
        dailyReportKpisId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getTimezone = /* GraphQL */ `
  query GetTimezone($timezone: String!) {
    getTimezone(timezone: $timezone) {
      datetime
      timezone
    }
  }
`;
