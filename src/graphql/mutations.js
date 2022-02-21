/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
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
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
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
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
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
export const createYearPoints = /* GraphQL */ `
  mutation CreateYearPoints(
    $input: CreateYearPointsInput!
    $condition: ModelYearPointsConditionInput
  ) {
    createYearPoints(input: $input, condition: $condition) {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const updateYearPoints = /* GraphQL */ `
  mutation UpdateYearPoints(
    $input: UpdateYearPointsInput!
    $condition: ModelYearPointsConditionInput
  ) {
    updateYearPoints(input: $input, condition: $condition) {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const deleteYearPoints = /* GraphQL */ `
  mutation DeleteYearPoints(
    $input: DeleteYearPointsInput!
    $condition: ModelYearPointsConditionInput
  ) {
    deleteYearPoints(input: $input, condition: $condition) {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const createWeeklyReport = /* GraphQL */ `
  mutation CreateWeeklyReport(
    $input: CreateWeeklyReportInput!
    $condition: ModelWeeklyReportConditionInput
  ) {
    createWeeklyReport(input: $input, condition: $condition) {
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
export const updateWeeklyReport = /* GraphQL */ `
  mutation UpdateWeeklyReport(
    $input: UpdateWeeklyReportInput!
    $condition: ModelWeeklyReportConditionInput
  ) {
    updateWeeklyReport(input: $input, condition: $condition) {
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
export const deleteWeeklyReport = /* GraphQL */ `
  mutation DeleteWeeklyReport(
    $input: DeleteWeeklyReportInput!
    $condition: ModelWeeklyReportConditionInput
  ) {
    deleteWeeklyReport(input: $input, condition: $condition) {
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
export const createMonthlyReport = /* GraphQL */ `
  mutation CreateMonthlyReport(
    $input: CreateMonthlyReportInput!
    $condition: ModelMonthlyReportConditionInput
  ) {
    createMonthlyReport(input: $input, condition: $condition) {
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
export const updateMonthlyReport = /* GraphQL */ `
  mutation UpdateMonthlyReport(
    $input: UpdateMonthlyReportInput!
    $condition: ModelMonthlyReportConditionInput
  ) {
    updateMonthlyReport(input: $input, condition: $condition) {
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
export const deleteMonthlyReport = /* GraphQL */ `
  mutation DeleteMonthlyReport(
    $input: DeleteMonthlyReportInput!
    $condition: ModelMonthlyReportConditionInput
  ) {
    deleteMonthlyReport(input: $input, condition: $condition) {
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
export const createDailyReport = /* GraphQL */ `
  mutation CreateDailyReport(
    $input: CreateDailyReportInput!
    $condition: ModelDailyReportConditionInput
  ) {
    createDailyReport(input: $input, condition: $condition) {
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
export const updateDailyReport = /* GraphQL */ `
  mutation UpdateDailyReport(
    $input: UpdateDailyReportInput!
    $condition: ModelDailyReportConditionInput
  ) {
    updateDailyReport(input: $input, condition: $condition) {
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
export const deleteDailyReport = /* GraphQL */ `
  mutation DeleteDailyReport(
    $input: DeleteDailyReportInput!
    $condition: ModelDailyReportConditionInput
  ) {
    deleteDailyReport(input: $input, condition: $condition) {
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
export const createKpi = /* GraphQL */ `
  mutation CreateKpi(
    $input: CreateKpiInput!
    $condition: ModelKpiConditionInput
  ) {
    createKpi(input: $input, condition: $condition) {
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
export const updateKpi = /* GraphQL */ `
  mutation UpdateKpi(
    $input: UpdateKpiInput!
    $condition: ModelKpiConditionInput
  ) {
    updateKpi(input: $input, condition: $condition) {
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
export const deleteKpi = /* GraphQL */ `
  mutation DeleteKpi(
    $input: DeleteKpiInput!
    $condition: ModelKpiConditionInput
  ) {
    deleteKpi(input: $input, condition: $condition) {
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
