import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

// Mapeo de los niveles que devuelve GitHub GraphQL (enum string) a 0–3
const LEVEL_MAP: Record<string, number> = {
  NONE:             0,
  FIRST_QUARTILE:   1,
  SECOND_QUARTILE:  2,
  THIRD_QUARTILE:   3,
  FOURTH_QUARTILE:  3,
};

interface GqlDay {
  date:              string;
  contributionCount: number;
  contributionLevel: string;
}

interface GqlResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GqlDay[] }[];
        };
      };
    };
  };
}

export interface ContributionResult {
  weeks: number[][];  // hasta 53 semanas × 7 días, valores 0–3
  total: number;
}

const STATIC_FALLBACK: ContributionResult = (() => {
  const seed = [3,1,0,2,1,0,3,2,1,0,1,2,3,0,1,2,0,3,1,2,0,1,3,2,1,0,2,3,1,0,1,2,0,3,2,1,0,1,2,3];
  return {
    weeks: Array.from({ length: 52 }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => seed[(w * 7 + d) % seed.length])
    ),
    total: 0,
  };
})();

const GQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);

  getContributions(username: string): Observable<ContributionResult> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `bearer ${environment.github.token}`,
    });

    return this.http
      .post<GqlResponse>(
        'https://api.github.com/graphql',
        { query: GQL_QUERY, variables: { username } },
        { headers }
      )
      .pipe(
        map(res => {
          const calendar = res.data.user.contributionsCollection.contributionCalendar;
          return {
            weeks: calendar.weeks.map(w =>
              w.contributionDays.map(d => LEVEL_MAP[d.contributionLevel] ?? 0)
            ),
            total: calendar.totalContributions,
          };
        }),
        catchError(() => of(STATIC_FALLBACK))
      );
  }
}
