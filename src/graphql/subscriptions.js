/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent($owner: String) {
    onCreateAgent(owner: $owner) {
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
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent($owner: String) {
    onUpdateAgent(owner: $owner) {
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
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent($owner: String) {
    onDeleteAgent(owner: $owner) {
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
export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign {
    onCreateCampaign {
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign {
    onUpdateCampaign {
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign {
    onDeleteCampaign {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
export const onCreateYearPoints = /* GraphQL */ `
  subscription OnCreateYearPoints {
    onCreateYearPoints {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateYearPoints = /* GraphQL */ `
  subscription OnUpdateYearPoints {
    onUpdateYearPoints {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteYearPoints = /* GraphQL */ `
  subscription OnDeleteYearPoints {
    onDeleteYearPoints {
      id
      agentID
      month
      date
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWeeklyReport = /* GraphQL */ `
  subscription OnCreateWeeklyReport {
    onCreateWeeklyReport {
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
export const onUpdateWeeklyReport = /* GraphQL */ `
  subscription OnUpdateWeeklyReport {
    onUpdateWeeklyReport {
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
export const onDeleteWeeklyReport = /* GraphQL */ `
  subscription OnDeleteWeeklyReport {
    onDeleteWeeklyReport {
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
export const onCreateMonthlyReport = /* GraphQL */ `
  subscription OnCreateMonthlyReport {
    onCreateMonthlyReport {
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
export const onUpdateMonthlyReport = /* GraphQL */ `
  subscription OnUpdateMonthlyReport {
    onUpdateMonthlyReport {
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
export const onDeleteMonthlyReport = /* GraphQL */ `
  subscription OnDeleteMonthlyReport {
    onDeleteMonthlyReport {
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
export const onCreateDailyReport = /* GraphQL */ `
  subscription OnCreateDailyReport {
    onCreateDailyReport {
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
export const onUpdateDailyReport = /* GraphQL */ `
  subscription OnUpdateDailyReport {
    onUpdateDailyReport {
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
export const onDeleteDailyReport = /* GraphQL */ `
  subscription OnDeleteDailyReport {
    onDeleteDailyReport {
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
export const onCreateKpi = /* GraphQL */ `
  subscription OnCreateKpi {
    onCreateKpi {
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
export const onUpdateKpi = /* GraphQL */ `
  subscription OnUpdateKpi {
    onUpdateKpi {
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
export const onDeleteKpi = /* GraphQL */ `
  subscription OnDeleteKpi {
    onDeleteKpi {
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
