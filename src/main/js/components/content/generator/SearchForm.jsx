import React from 'react';
import { FormSection } from 'redux-form';
import { ClipLoader } from 'react-spinners';
import FormModule from '../../FormModule';
import SearchList from '../../../containers/content/generator/SearchList';
import formDefaults from '../../../constants/formDefaults';

class SearchForm extends React.Component {
  componentWillMount() {
    const { firstRender, initialize, formValues } = this.props;
    if (firstRender) {
      initialize(formValues);
    }
  }

  componentDidMount() {
    $('.selectpicker').selectpicker('refresh');
  }

  componentDidUpdate() {
    $('.selectpicker').selectpicker('refresh');
    $("[data-toggle='popover']").popover();
  }

  render() {
    const {
      schedule,
      handleSubmit,
      submit,
      resetForm,
      removeCourse,
      isFetching,
      sortByGPAChecked,
      useCourseAvgChecked,
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit(submit)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <div className="page-header no-margin-bottom">
          <h1 className="o">
            Restrictions
          </h1>
        </div>
        <div className="pad-bottom">
          <div className="pad-top">
            <h4>
              Term
            </h4>
            <FormModule
              type="select"
              name="term"
              width="auto"
              values={formDefaults.terms}
              onChange={resetForm}
            />
          </div>
          <div className="flex-container">
            <div className="pad-top margin-right">
              <h4>
                Start Time
              </h4>
              <div className="flex-container">
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="h1"
                    width="auto"
                    values={[
                      '01', '02', '03', '04', '05', '06',
                      '07', '08', '09', '10', '11', '12',
                    ]}
                  />
                </div>
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="m1"
                    width="auto"
                    values={[
                      '00', '05', '10', '15', '20', '25',
                      '30', '35', '40', '45', '50', '55',
                    ]}
                  />
                </div>
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="start"
                    width="auto"
                    values={['AM', 'PM']}
                  />
                </div>
              </div>
            </div>
            <div className="pad-top margin-right">
              <h4>
                End Time
              </h4>
              <div className="flex-container">
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="h2"
                    width="auto"
                    values={[
                      '01', '02', '03', '04', '05', '06',
                      '07', '08', '09', '10', '11', '12',
                    ]}
                  />
                </div>
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="m2"
                    width="auto"
                    values={[
                      '00', '05', '10', '15', '20', '25',
                      '30', '35', '40', '45', '50', '55',
                    ]}
                  />
                </div>
                <div className="no-pad">
                  <FormModule
                    type="select"
                    name="end"
                    width="auto"
                    values={['AM', 'PM']}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-container">
            <div className="pad-top margin-right">
              <h4>
                Gap Time
              </h4>
              <FormModule
                type="select"
                name="gap"
                width="auto"
                values={[
                  '0', '5', '10', '15', '20', '25', '30',
                  '35', '40', '45', '50', '55', '60',
                ]}
              />
            </div>
            <div className="pad-top margin-right">
              <h4>
                Free Days
              </h4>
              <FormModule
                type="select"
                name="free"
                values={[{
                  name: 'Monday',
                  value: 'M',
                }, {
                  name: 'Tuesday',
                  value: 'T',
                }, {
                  name: 'Wednesday',
                  value: 'W',
                }, {
                  name: 'Thursday',
                  value: 'R',
                }, {
                  name: 'Friday',
                  value: 'F',
                }]}
                multiple
              />
            </div>
          </div>
          <div className="flex-container">
            <div className="pad-top margin-right">
              <label className="checkbox-inline">
                <FormModule
                  checked={sortByGPAChecked ? 'checked' : ''}
                  type="checkbox"
                  name="sortByGPA"
                />
                Sort by Estimated GPA
              </label>
            </div>
            {sortByGPAChecked && (
              <div className="pad-top margin-right">
                <label className="checkbox-inline">
                  <FormModule
                    checked={useCourseAvgChecked ? 'checked' : ''}
                    type="checkbox"
                    name="useCourseAvg"
                  />
                  {'Impute Averages '}
                  <a
                    className="badge"
                    data-toggle="popover"
                    data-trigger="hover"
                    data-content="Use course average if there is no available instructor data. An asterisk {*} will denote if a course average was used."
                  >
                    ?
                  </a>
                </label>
              </div>
            )}
          </div>
          {sortByGPAChecked && (
            <div className="flex-container">
              <div className="pad-top margin-right">
                <h4>
                  Earliest Grade Data
                </h4>
                <FormModule
                  type="select"
                  name="gradeTerm"
                  values={[
                    'Fall 2018', 'Spring 2018', 'Fall 2017',
                    'Spring 2017', 'Fall 2016', 'Spring 2016',
                    'Fall 2015', 'Spring 2015', 'Fall 2014',
                    'Spring 2014', 'Fall 2013', 'Spring 2013',
                    'Fall 2012', 'Spring 2012', 'Fall 2011',
                    'Spring 2011', 'Fall 2010', 'Spring 2010',
                    'Fall 2009', 'Spring 2009', 'Fall 2008',
                    'Spring 2008', 'Fall 2007', 'Spring 2007',
                    'Fall 2006', 'Spring 2006', 'Fall 2005',
                    'Spring 2005', 'Fall 2004', 'Spring 2004',
                    'Fall 2003',
                  ]}
                />
              </div>
            </div>
          )}
          {process.env.NODE_ENV !== 'production' && (
            <div className="flex-container">
              <div className="pad-top margin-right">
                <label className="checkbox-inline">
                  <FormModule
                    type="checkbox"
                    name="genURL"
                  />
                  [dev-only] Generate URL
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="no-pad">
          <div className="flex-container">
            <h3 className="pad-right">
              {`Current Schedule${schedule.length === 12 ? ' (Max)' : ''}`}
            </h3>
            {isFetching && <ClipLoader size={25} color="darkorange" />}
          </div>
          <div className="pad-top">
            <SearchList />
          </div>
          <FormSection name="courses">
            <div className="table-responsive">
              <table id="schedule" className="table">
                <thead className="thead-inverse">
                  <tr>
                    <th>
                      CRN
                    </th>
                    <th>
                      Course
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Class Type
                    </th>
                    <th>
                      Professor
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {schedule.map(courseList => (
                    <FormSection
                      key={`${courseList[0].subject}${courseList[0].courseNumber}${courseList.id}`}
                      name={`${courseList[0].subject}${courseList[0].courseNumber}${courseList.id}`}
                    >
                      <tr>
                        <td>
                          <FormModule
                            type="select"
                            name="crns"
                            values={courseList.map(course => `${course.crn}`)}
                            multiple
                            title="Any"
                          />
                        </td>
                        <td>
                          {`${courseList[0].subject} ${courseList[0].courseNumber}`}
                        </td>
                        <td>
                          {courseList[0].name}
                        </td>
                        <td>
                          <FormModule
                            type="select"
                            name="types"
                            values={[...new Set(courseList.map(course => course.type))]}
                            multiple
                            title="Any"
                          />
                        </td>
                        <td>
                          <FormModule
                            type="select"
                            name="instructors"
                            values={[...new Set(courseList.map(course => course.instructor))]}
                            multiple
                            title="Any"
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-default"
                            type="button"
                            onClick={() => removeCourse(courseList)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </FormSection>
                  ))}
                </tbody>
              </table>
            </div>
          </FormSection>
        </div>
        <div className="pad-top pad-bottom border-top">
          <button className="btn btn-default btn-lg" type="submit">
            Create Schedules
          </button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
