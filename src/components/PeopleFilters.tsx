import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('queкн') || '';
  const gender = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];
  const [activeLink, setActiveLink] = useState('all');

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', e.target.value);
    setSearchParams(params);
  }

  function handleLinkSelection(sex: string) {
    const params = new URLSearchParams(searchParams);

    setActiveLink(sex);

    params.set('sex', sex);
    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function clearAll() {
    setSearchParams('');
  }

  function toggleCenturies(x: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(x)
      ? centuries.filter(y => y !== x)
      : [...centuries, x];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': activeLink === 'all' })}
          onClick={() => handleLinkSelection('all')}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': activeLink === 'male' })}
          onClick={() => handleLinkSelection('male')}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': activeLink === 'female' })}
          onClick={() => handleLinkSelection('female')}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => handleQueryChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              params={{ centuries: [...centuries, '16'] }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => toggleCenturies('16')}
            >
              16
            </SearchLink>

            <SearchLink
              params={{ centuries: [...centuries, '17'] }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => toggleCenturies('17')}
            >
              17
            </SearchLink>

            <SearchLink
              params={{ centuries: [...centuries, '18'] }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => toggleCenturies('18')}
            >
              18
            </SearchLink>

            <SearchLink
              params={{ centuries: [...centuries, '19'] }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => toggleCenturies('19')}
            >
              19
            </SearchLink>

            <SearchLink
              params={{ centuries: [...centuries, '20'] }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => toggleCenturies('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={() => clearCenturies()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => clearAll()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
