import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import {
  CChartDoughnut
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/RainMakerData'
import ChartLineSimple from 'src/views/charts/ChartLineSimple'

const ClassifyStatus = data => {
  let count=[0,0,0,0];
  data.forEach(element => {
    switch (element.status) {
      case 'Active': {count[0]++; break; }
      case 'Inactive': { count[1]++; break; }
      case 'Pending': { count[2]++; break; }
      case 'Banned': { count[3]++; break; }
      default: ;
    }
  });
return count;
}
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','registered', 'role', 'status']
// const CountStatus=['Active'=0,'Inactive'=0,'Pending'=0,'Banned'=0]
const CountStatus=ClassifyStatus(usersData);

const Tables = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              RainMaker Table
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              RainMaker Chart
            </CCardHeader>
            <CCardBody>
            {
              <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data:CountStatus
              }
            ]}
            labels={['Active', 'Inactive', 'Pending', 'Banned']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
            }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Combined All dark Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
